const user = {id:1, name: 'julien', age:35, eyes:'brown', date:{year:1, hours:2, minutes:3}};
const moi = {...user};
console.log(moi);
const moi2 = {user};
console.log(moi2);
const moi3 = user;
console.log(moi3);