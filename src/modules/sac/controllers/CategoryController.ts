import { Request, Response } from 'express';
import { SacCategories } from '../models/Issue';

export const getSacCategories = async (req: Request, res: Response) => {
  const categoriesList = await SacCategories.find();

  const resSuccessMessage = {
    retcode: 0,
    categoriesList
  };

  const resEmptySacListMessage = {
    retcode: 1,
    message: 'Nenhuma categoria registrada até o momento'
  };

  //Caso retorne um array vazio do banco de dados retorna esse objeto de menssagem:
  if (categoriesList.length < 1) {
    return res.status(404).json({ resEmptySacListMessage });
  }

  return res.status(200).json({ resSuccessMessage });
};

// Action de criar um novo registro dentro da tabela 'SacCategories':
export const createSacCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await SacCategories.findOne({ name });

    if (category) {
      return res.status(400).json({
        retcode: 1,
        message: 'Categoria ja existe em nosso banco de dados'
      });
    }

    const newCategory = new SacCategories();
    newCategory.name = name;

    newCategory.save();

    return res.status(201).json({
      retcode: 0,
      message: 'Categoria registrada com sucesso',
      newCategory
    });
  } catch (err) {
    return res.status(400).json({ retcode: 2, message: err });
  }
};
