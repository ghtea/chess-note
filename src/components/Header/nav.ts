
export type Link = {
    id: string;        //   camelcase
    name?: string;
}

export type Category = {
    id: string;        //   camelcase
    name?: string;
    listLink: Link[];
}

const nav: Category[] = [
    {
        id: 'sports',
        listLink: [
            {id: 'football'} 
        ],
    },
    {
        id: 'life',
        listLink: [
            {id: 'weather'} 
        ],
    },
]


export default nav;