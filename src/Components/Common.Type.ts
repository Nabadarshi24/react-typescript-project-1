export type TypeCardlist = {
    title: string | number;
    cards: TypeCard[];
 }

export type TypeCard = {
    title: string;
    labelTitle: string;
    labels: TypeLabels[];
    dateTitle: string;
    date: Date;
    descriptionValue: string;
    checklistTitle: string;
    checklists: TypeChecklists[];
}

export type TypeLabels = {
    id: string | number;
    value: string;
    className: string;
    label: string;
}

export type TypeChecklists = {
    isChecked: boolean;
    name: string;
}