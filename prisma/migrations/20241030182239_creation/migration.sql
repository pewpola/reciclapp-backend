-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `rua` VARCHAR(45) NOT NULL,
    `numero` INTEGER NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `numero` VARCHAR(45) NOT NULL,
    `Usuario_idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`numero`, `Usuario_idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Email` (
    `email` VARCHAR(45) NOT NULL,
    `Usuario_idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`email`, `Usuario_idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movel` (
    `idMovel` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `preco` DECIMAL(11, 2) NOT NULL,
    `estado` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `urlImagem` VARCHAR(255) NULL,

    PRIMARY KEY (`idMovel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrinho` (
    `idCarrinho` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`idCarrinho`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCarrinho` (
    `idItem` INTEGER NOT NULL AUTO_INCREMENT,
    `Carrinho_idCarrinho` INTEGER NOT NULL,
    `Movel_idMovel` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`idItem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `idServico` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_idUsuario` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `rua` VARCHAR(45) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `descricao` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`idServico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Email` ADD CONSTRAINT `Email_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movel` ADD CONSTRAINT `Movel_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCarrinho` ADD CONSTRAINT `ItemCarrinho_Carrinho_idCarrinho_fkey` FOREIGN KEY (`Carrinho_idCarrinho`) REFERENCES `Carrinho`(`idCarrinho`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCarrinho` ADD CONSTRAINT `ItemCarrinho_Movel_idMovel_fkey` FOREIGN KEY (`Movel_idMovel`) REFERENCES `Movel`(`idMovel`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_Usuario_idUsuario_fkey` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
