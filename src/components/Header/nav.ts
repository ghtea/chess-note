
export type Link = {
    id: string;        //   camelcase
    kind: 'link';
    name?: string;
}

export type Category = {
    id: string;        //   camelcase
    kind: 'category';
    name?: string;
    listLink: Link[];
}

const nav: (Category | Link)[] = [
    {
        id: 'opening',
        kind: 'link'
    },
    {
        id: 'quiz',
        kind: 'link'
    },
    
]

/*
{
        id: 'animal',
        listLink: [
            {id: 'cat'} 
        ],
    }
*/

export default nav;