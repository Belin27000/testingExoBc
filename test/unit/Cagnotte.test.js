const { ethers } = require("hardhat");
const { assert, expect } = require('chai');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Cagnotte contract test", function () {

    async function deployContractFixture() {
        // Récupérer l'instance du contrat "Cagnotte"
        // const CagnotteFactory = await ethers.getContractFactory("Cagnotte");

        // Obtenir les signers (comptes)
        const [owner, addr1, addr2] = await ethers.getSigners();

        let goal = ethers.parseEther('5')
        // Déployer le contrat en envoyant 1 Ether lors du déploiement
        const deployedCagnotte = await ethers.deployContract("Cagnotte", [goal]);

        // Retourner les éléments nécessaires pour les tests
        return { deployedCagnotte, owner, addr1, addr2 };
    }

    it('Should deploy correctly the contract', async function () {
        const { deployedCagnotte, owner } = await loadFixture(deployContractFixture);

        // Vérifier que l'adresse du propriétaire est correcte
        expect(await deployedCagnotte.owner()).to.equal(owner.address);
    });

    it('should check if the goal is highter of 0', async function () {
        await expect(ethers.deployContract('Cagnotte', [0])).to.be.revertedWith("Goal must be greater than 0")
    })
    describe('Check despoit function', function () {
        if ('Should allow to deposit', async function () {
            const { deployedCagnotte, owner } = await loadFixture(deployContractFixture);

        })
        

    })

});