// https://backend-intro.vlpt.us/6/04.html

// 로컬 스토리지에 JSON 형태로 저장 / 불러오기 / 삭제 헬퍼
const storage = {
    set: (key:string, value: unknown) => {
        if(!localStorage) return;
        localStorage[key] = (typeof value) === 'string' ? value : JSON.stringify(value);
    },
    get: (key:string) => {
        if(!localStorage) return null;

        if(!localStorage[key]) {
            return null;
        }

        try {
            const parsed = JSON.parse(localStorage[key]);
            return parsed;
        } catch(e) {
            return localStorage[key];
        }
    },
    remove: (key:string) => {
        if(!localStorage) return null;

        if(localStorage[key]) {
            localStorage.removeItem(key);
        }
    }
};

export default storage;