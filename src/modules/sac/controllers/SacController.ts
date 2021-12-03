//Importando nossa entidade (tabela) para podermos aplicarmos métodos como find, update, create e etc.
import { Sac } from '../models/Sac';

import { Request, Response } from 'express';

import { ICreateSacItemBody } from '../interfaces/sac.interfaces';

// Action de listar todos os registros dentro da tabela 'Sac':
export const getSacList = async (req: Request, res: Response) => {
  const sacList = await Sac.find();

  const resSuccessMessage = {
    retcode: 0,
    sacList,
    message: 'Sucesso ao listar todas as reclamações'
  };

  const resEmptySacListMessage = {
    retcode: 1,
    message: 'Nenhuma reclamação em aberto'
  };

  //Caso retorne um array vazio do banco de dados retorna esse objeto de menssagem:
  if (sacList.length < 1) {
    return res.status(404).json({ resEmptySacListMessage });
  }

  return res.status(200).json({ resSuccessMessage });
};

// Action de criar um novo registro dentro da tabela 'Sac':
export const createSac = async (req: Request, res: Response) => {
  const body: ICreateSacItemBody = req.body;

  const { url, category, description } = body;

  try {
    const newSac = new Sac();
    newSac.url = url;
    newSac.category = category;
    newSac.description = description;

    newSac.save();

    return res.status(201).json({
      retcode: 0,
      message: 'Reclamção registrada com sucesso',
      newSac
    });
  } catch (err) {
    return res.status(400).json({ retcode: 2, message: err });
  }
};
