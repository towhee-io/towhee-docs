import React, {useEffect} from 'react';
import {init} from '../katacoda-embed';
import styles from './button.module.css';

const KatacodaBtn = () => {
  const handleBtnClick = () => {
    // open terminal
    window.katacoda && window.katacoda.init();
    // add more bottom margin for this page
    const container = document.querySelector('.container');
    container.style.marginBottom = '140px';
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
        data-katacoda-env="python:3.8"
        // data-katacoda-command="start.sh"
        data-katacoda-ui="panel"></div>
      <button className={styles.button} onClick={handleBtnClick}>
        Launch Terminal
      </button>
    </>
  );
};

export default KatacodaBtn;
