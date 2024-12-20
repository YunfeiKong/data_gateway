import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    aside: {
      borderRight: '1px solid #eee',
      padding: '15px 10px',
      fontSize: '12px',
      background: '#fcfcfc',
      marginBottom: '10px',
    },
    description: {
      marginBottom: '10px',
    },
    dndnode: {
      height: '20px',
      padding: '4px',
      border: '1px solid #1a192b',
      borderRadius: '2px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'grab',
    },
    input: {
        borderColor: '#0041d0',
    },
    output: {
        borderColor: '#ff0072',
    },
    'dndnode.input': {
      borderColor: '#0041d0',
    },
    'dndnode.output': {
      borderColor: '#ff0072',
    },
    'reactflow-wrapper': {
      flexGrow: '1',
      height: '100%',
    },
    selectall: {
      marginTop: '10px',
    },
  };
});
export default useStyles;