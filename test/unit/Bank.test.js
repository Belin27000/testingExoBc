const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("Bank contract test", function () {
    let owner, addr1;
    let bank;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        bank = await ethers.deployContract("Bank");

    });

    describe('Check the contract owner', function () {
        it('the owner should be different from the contract deployer', async function () {
            assert.notEqual(owner, addr1, "Owner should not be addr1");
        });
    });

    describe('Check deposit function', function () {
        it('Should authorize the owner to deposit', async function () {
            await expect(
                bank.connect(owner).deposit({ value: ethers.parseEther("0.1") })
            ).to.not.be.reverted;
        });
        it('should emit the event Deposit if the deposit succeed', async function () {
            await expect(
                bank.connect(owner).deposit({ value: ethers.parseEther("0.1") })
            ).to.emit(bank, 'Deposit')
                .withArgs(owner.address, ethers.parseEther("0.1"));
        })
        it('should revert if non-owner tries to deposit', async function () {
            await expect(
                bank.connect(addr1).deposit({ value: ethers.parseEther("0.1") })
            ).to.be.revertedWithCustomError(bank, 'OwnableUnauthorizedAccount')
                .withArgs(addr1.address);
        });
        it('Should revert if the amont is < 0.1 ethers', async function () {
            await expect(
                bank.connect(owner).deposit({ value: ethers.parseEther("0.01") })
            ).to.be.reverted;
        })

    });
    describe('Check withdraw function', function () {
        it('Should authorize the owner to withdraw', async function () {
            await bank.connect(owner).deposit({ value: ethers.parseEther(".5") })

            await expect(
                bank.connect(owner).withdraw(ethers.parseEther("0.25"))
            ).to.not.be.reverted;
        });
        it('should emit the event Withdrawsucceed', async function () {

            await bank.connect(owner).deposit({ value: ethers.parseEther(".5") })

            await expect(
                bank.connect(owner).withdraw(ethers.parseEther("0.1"))
            ).to.emit(bank, 'Withdraw')
                .withArgs(owner.address, ethers.parseEther("0.1"));
        })
        it('Should revert if a non-owner try to withdraw', async function () {
            await bank.connect(owner).deposit({ value: ethers.parseEther(".5") })

            await expect(
                bank.connect(addr1).withdraw(ethers.parseEther("0.25"))
            ).to.be.reverted;
        });
        it('Should revert if a amount is higther of the balance account', async function () {
            await bank.connect(owner).deposit({ value: ethers.parseEther(".5") })

            await expect(
                bank.connect(owner).withdraw(ethers.parseEther("1"))
            ).to.be.reverted;
        });

    });

});