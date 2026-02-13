import apps from "../apps.json";

export interface IApp {
  developer_name?: string | undefined | null;
  keywords?: string[] | undefined | null;
  summary: string;
  categories?: string[] | undefined | null;
  id: string;
  name: string;
  icon?: string | undefined | null;
}

export class AppsService {
  public static findAll(): IApp[] {
    return apps;
  }

  public static findById(_id: string): IApp | null {
    return apps.filter(({ id }) => id === _id)[0] || null;
  }

  public static getRandomItems(amount: number): IApp[] {
    if (amount > apps.length) {
      throw new Error(
        "The requested quantity is greater than the size of the array.",
      );
    }

    const shuffled = [...apps].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, amount);
  }
}
