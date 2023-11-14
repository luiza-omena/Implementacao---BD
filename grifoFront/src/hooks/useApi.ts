// import axios from "axios";

// function useApi()  {

//     const getUniqueId = (): string => {
//         const token = localStorage.getItem('id');
//         if(!token) {
//             const id = uuidv4();
//             localStorage.setItem('id', id);
//             return id;
//         }
//         return token;
//     }

//     const api = axios.create({
//         baseURL: 'localhost:',
//         headers: {
//             "x-access-user": getUniqueId(),
//         }
//     });

// }


// export default useApi;