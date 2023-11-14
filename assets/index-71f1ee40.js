import{j as d}from"./jsx-runtime-ffb262ed.js";import{o as m,s as r,a as e}from"./index-ba3a9bc5.js";import"./theme-a80e6fbd.js";import{A as u}from"./index-6178a390.js";import{u as n}from"./index-34025e41.js";const _=()=>{const a=n(),o=m({name:r({required_error:e.required,invalid_type_error:e.wrongType}),email:r({required_error:e.required,invalid_type_error:e.wrongType}).email({message:e.wrongEmail}),phone:r({required_error:e.required,invalid_type_error:e.wrongType}).min(10,{message:e.minTenSymbols}).regex(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/,{message:e.wrongPhone}),password:r({required_error:e.required,invalid_type_error:e.wrongType}).min(8,{message:e.minEightSymbols}),passwordRepeat:r({required_error:e.required,invalid_type_error:e.wrongType})}).superRefine(({passwordRepeat:p,password:l},i)=>{p!==l&&i.addIssue({code:"custom",message:e.wrongPasswordRepeat,path:["passwordRepeat"]})}),t=[{name:"name",label:"Имя",type:"text",defaultHelperText:"Как к вам обращаться?",autoComplete:"name",required:!0,placeholder:""},{name:"phone",label:"Телефон",type:"tel",defaultHelperText:" ",autoComplete:"tel",required:!0,placeholder:"+7 (999) 999-99-99"},{name:"email",label:"Email",type:"email",defaultHelperText:" ",autoComplete:"email",required:!0,placeholder:""},{name:"password",label:"Пароль",type:"password",defaultHelperText:" ",autoComplete:"new-password",required:!0,placeholder:""},{name:"passwordRepeat",label:"Пароль еще раз",type:"password",defaultHelperText:" ",autoComplete:"new-password",required:!0,placeholder:""}],s=()=>{a("/authorizedNoCards",{relative:"path"})};return d.jsx(u,{fields:t,schema:o,button:{label:"Далее",fullWidth:!0},submit:s})};export{_ as S};
//# sourceMappingURL=index-71f1ee40.js.map
