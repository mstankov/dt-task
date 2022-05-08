import data from '../../data/data.json';
import { BoardData } from '../../shared/types';

export const getBoardDataAsync = (): Promise<BoardData> => {
  return new Promise((resolve) => {
    resolve(data);
  });
};
