import{jsx as e}from"react/jsx-runtime";import{createTheme as r,ThemeProvider as o,Button as a}from"@mui/material";const t=r({palette:{primary:{main:"#1976d2"},secondary:{main:"#dc004e"}},typography:{button:{textTransform:"none"}},components:{MuiButton:{styleOverrides:{root:{maxWidth:"100%",height:"40px",width:"240px",backgroundColor:"rgba(128, 0, 0, 0.8)",borderRadius:"8px",fontSize:"16px",textAlign:"center",color:"white",textTransform:"none",zIndex:2,"&:hover":{boxShadow:"0px 4px 4px rgba(138, 110, 147, 0.5)",borderRadius:"40px",backgroundColor:"rgba(128, 0, 0, 1)"},"&:active":{background:"#004b87"},"&:disabled":{background:"#e5eef1",color:"#bcccd3"}}}}}}),i=({style:r,disabled:i,disableRipple:d,onClick:n,children:c,className:l,rounded:p=!1})=>e(o,{theme:t,children:e(a,{className:`primary-button ${l}`,disabled:i,disableRipple:d,sx:{...r,borderRadius:p?"40px":"8px"},onClick:n,children:c})}),d=r=>e(i,{...r});export{d as PrimaryButton};
//# sourceMappingURL=index.esm.js.map