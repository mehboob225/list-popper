import { css } from "lit";
export default css`
  #root {
    display: inline-block;
  }

  #list-root {
    position: absolute;
    z-index: 1;
    border: 1px solid var(--theme-lightest, #c0e94f);
    box-shadow: 0 0 10px var(--theme-lightest50, #c0e94f80);
    border-radius: 3px;
    list-style: none;
    padding: 0px;
    margin: 0px;
    max-height: 220px;
    overflow-y: auto;
  }

  #list-root div {
    display: none;
    position: fixed;
    z-index: 1;
  }

  #list-root ul {
    padding: 0px;
    margin: 0px;
    border: 1px solid var(--theme-lightest, #c0e94f);
    box-shadow: 0 0 10px var(--theme-lightest50, #c0e94f80);
    border-radius: 3px;
    list-style: none;
    width: inherit;
    margin: 2px;
    max-height: 220px;
    overflow-y: auto;
  }

  #list-root li {
    padding: 0 10px;
    height: 32px;
    display: flex;
    align-items: center;
    color: #222;
  }

  #list-root ul li {
    padding: 0 10px;
    height: 32px;
    display: flex;
    align-items: center;
    color: #222;
    width: inherit;
  }

  #list-root li svg {
    margin-left: auto;
    fill: #222;
  }

  #list-root li:hover {
    background-color: var(--theme-base, #527a00);
    color: #fff;
    cursor: pointer;
  }

  #list-root li:hover div {
    display: inline-block;
  }

  #list-root li:hover svg {
    fill: #fff;
  }

  #list-root #label {
    font-size: 12px;
    height: 25px;
  }

  #list-root li#label:hover {
    font-size: 12px;
    height: 25px;
    background-color: #fff;
    color: #222;
    cursor: default;
  }

  li#search {
    background-color: #fff;
    color: #222;
    cursor: default;
    padding: 0px;
    border-bottom: 1px solid var(--theme-lightest, #c0e94f);
  }

  li#search input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }
`;
