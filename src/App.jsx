import React from "react";
import List from "./components/list/list";
import Chat from "./components/chat/chat";
import Detail from "./components/detail/detail";
export const App = () => {
  return(
    <div className="container">
    <List/>
    <Chat/>
    <Detail/>

    </div>
  )
};