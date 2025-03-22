export class Institution {
    id?: string;
    name!: string;
    code!: string;
    isActive: boolean = true;
    constructor(init?: Partial<Institution>) {
      Object.assign(this, init);
    }
  }
  