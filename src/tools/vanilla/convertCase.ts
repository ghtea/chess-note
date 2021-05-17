

type Case = 'camel' | 'pascal' | 'snakeLower' | 'snakeUpper' | 'kebabLower' | 'kebabUpper';

// testTest, TestTest, test_test, TEST_TEST, test-test, TEST-TEST

const convertCase = (nameStarting: string, caseEnding: Case):string => {

    let result = nameStarting;

    const list: string[] = 
        nameStarting
        .split(/[-_]+/)
        .reduce( 
            (acc, current)=> [...acc, ...current.split(/(?=[A-Z][a-z])/)]
            , [] as string[]
        );
    
    for (let i = 0; i < list.length; i++){
        list[i] = list[i].toLowerCase();
    }
    
    // ex) list : ['aaad', 'cdegd', 'ess' ] 

    if (caseEnding === 'camel'){
        result = list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current.replace(/^[A-Z]/, str => str.toLowerCase());
            } 
            else {
                return acc + current.replace(/^[a-z]/, str => str.toUpperCase());
            }
        }, '');
    }
    else if (caseEnding === 'pascal'){
        result = list.reduce( (acc, current)=>{
            return acc + current.replace(/^[a-z]/, str => str.toUpperCase());
        }, '');
    }
    else if (caseEnding === 'snakeLower'){
        result = list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current
            }
            else {
                return acc + '_' + current;
            }
        }, '');
    }
    else if (caseEnding === 'snakeUpper'){
        result = list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current.toUpperCase();
            }
            else {
                return acc + '_' + current.toUpperCase();
            }
        }, '');
    }
    else if (caseEnding === 'kebabLower'){
        result = list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current
            }
            else {
                return acc + '-' + current;
            }
        }, '');
    }
    else if (caseEnding === 'kebabUpper'){
        result = list.reduce((acc, current, index)=>{
            if (index === 0){
                return acc + current.toUpperCase();
            }
            else {
                return acc + '-' + current.toUpperCase();
            }
        }, '');
    }

    return result;
}


export default convertCase;