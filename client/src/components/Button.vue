<template>
    <button class="action-button" @click="handleClick">
      <i :class="iconClass" :style="{ color: iconColor, fontSize: iconSize }"></i>
      <div>{{ buttonText }}</div>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      iconClass: {
        type: String,
        required: true
      },
      iconColor: {
        type: String,
        default: 'black'
      },
      iconSize: {
        type: String,
        default: '25px'
      },
      buttonText: {
        type: String,
        required: true
      },
      handleClick: {
        type: Function,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .action-button {
    width: 150px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 5px;
  }
  
  .action-button:hover {
    background-color: #ddd;
  }
  
  .action-button div {
    margin-left: 10px;
  }
  </style>
  