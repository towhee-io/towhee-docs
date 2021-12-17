import React, { useEffect } from 'react';
import { init } from '../katacoda-embed';
import styles from './button.module.css'

const KatacodaBtn = () => {
  const handleBtnClick = () => {
    window.katacoda && window.katacoda.init();
  };

  useEffect(() => {
    // init katacoda
    init();
  }, []);

  return (
    <>
      <div
        id="katacoda-terminal"
        data-katacoda-ondemand="true"
        // data-katacoda-port="30000"
        data-katacoda-env="bash"
        // data-katacoda-command="start.sh"
        data-katacoda-ui="panel"
      ></div>
      <button className={styles.button} onClick={handleBtnClick}>Launch Terminal</button>
    </>
  );
};

export default KatacodaBtn;
