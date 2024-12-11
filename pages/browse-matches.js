import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState } from "react";
import MatchGridItem from "../components/MatchGridItem";

export default function Index() {
  

  return (
    <div>
      <Layout />
      <div style={Styles.heroContent}>
      <p> Now that you have met someone, let's see your compatibility without revealing specific answers. </p>
      </div>
      <p> </p>
      
    </div>
  );
}
