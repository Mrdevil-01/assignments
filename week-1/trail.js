a="hello world"
b="        hello world          "

const length=(x)=>{
console.log(x.length);
}
const trim=(x)=>{
  console.log(x.trim())
}
const getElement=(x)=>{
  console.log(x.slice(6,11) )
}
const indexof=(x)=>{
  console.log(x.indexOf('world'))
}
const lastindexOf=(x)=>{
  console.log(x.lastIndexOf('world'))
}

length(a);
trim(b);
getElement(a);
indexof(a);
lastindexOf(a);