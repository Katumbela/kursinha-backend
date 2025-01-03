/* eslint-disable prettier/prettier */



export class ComplaintEntity {
    id: string;
    anexos: string[];
    empresaId: string;
    nomeEmpresa: string;
    cliente: string;
    emailCliente: string;
    status: string;
    photo?: string;
    classificacao: number;
    historia: string;
    mostrarNome?: boolean;
    quando: string;
    titulo: string;
    solicitarNovamente: string;
    timestamp?: Date;
}
