/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'; // Adicionar importação do PrismaClient

const prisma = new PrismaClient(); // Instanciar PrismaClient

export async function generateUniqueSlug(baseSlug: string) {
    // Gera o slug base
    const slug = baseSlug.toLowerCase().replace(/\s+/g, '-');

    // Verifica se o slug já existe
    const existingEmpresa = await prisma.empresa.findUnique({
        where: { slug: slug }
    });

    if (!existingEmpresa) {
        return slug; // Retorna o slug base se não existir
    }

    // Se o slug já existir, adiciona um sufixo aleatório
    let suffix = 1;

    while (await prisma.empresa.findUnique({ where: { slug: `${slug}-${suffix}` } })) {
        suffix++;
    }

    // Adiciona um hash aleatório ao slug
    const uniqueSlug = `${slug}-${suffix}`;
    return uniqueSlug; // Retorna o slug único
}
