/* eslint-disable prettier/prettier */
export class CompanyEntity {
    id?: string;
    nomeEmpresa: string;
    emailEmpresa: string;
    senha: string;
    numeroBI?: string;
    siteEmpresa?: string;
    whatsapp?: string;
    enderecoEmpresa?: string;
    sobre?: string;
    nomeResponsavel?: string;
    conta?: string = 'empresa';
    tipo?: string = 'empresa';
    insta?: string;
    youtube?: string;
    fb?: string;
    selo?: boolean = false;
    logo?: string;
    capa?: string;
    quando?: string;
    categoria?: string;
    slug?: string;
}
