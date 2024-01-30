
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import BankQuestions from "views/bank_question";
import Desempenho from "views/history_desempenho";
var routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/web",
  },

  {
    path: "/maps",
    name: "Controle de Estudos",
    icon: "ni ni-atom text-orange",
    component: <Maps />,
    layout: "/web",
  },

  {
    path: "/banco_questoes",
    name: "Banco de Questões",
    icon: "ni ni-collection text-purple",
    component:  <BankQuestions />,
    layout: "/web",
  },

  {
    path: "/desempenho",
    name: "Desempenho",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Desempenho />,
    layout: "/web",
  },

  {
    path: "/maps",
    name: "Cronograma",
    icon: "ni ni-calendar-grid-58 text-green",
    component: <Maps />,
    layout: "/web",
  },

  {
    path: "/simulados",
    name: "Simulados",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/web",
  },

  {
    path: "/tables",
    name: "Redação",
    icon: "ni ni-align-center text-blue",
    component: <Tables />,
    layout: "/web",
  },


  {
    path: "/maps",
    name: "Aulas",
    icon: "ni ni-hat-3 text-pink",
    component: <Maps />,
    layout: "/web",
  },


 



  {
    path: "/user-profile",
    name: "Perfil",
    icon: "ni ni-single-02 text-gray",
    component: <Profile />,
    layout: "/web",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
