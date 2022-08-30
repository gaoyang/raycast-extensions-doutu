export declare interface IDoutuImage {
  id: number;
  url: string;
}

export declare interface ISource {
  get: (keyword: string, pageIndex: number, pageSize: number) => Promise<IDoutuImage[]>;
}

export class DouTuLaSource implements ISource {
  get = async (keyword: string, pageIndex: number, pageSize: number): Promise<IDoutuImage[]> => {
    return [
      {
        id: 1,
        url: "https://img.pkdoutu.com/production/uploads/image/2022/08/25/20220825411333_aRoQOF.jpg",
      },
      {
        id: 2,
        url: "https://img.pkdoutu.com/production/uploads/image/2022/08/25/20220825411333_aRoQOF.jpg",
      },
      {
        id: 3,
        url: "https://img.pkdoutu.com/production/uploads/image/2022/08/25/20220825411333_aRoQOF.jpg",
      },
    ];
  };
}
