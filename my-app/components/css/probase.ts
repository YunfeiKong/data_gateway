import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    container: {
        width: '100%',
        height: '600px',
      },
      stringNode: {
        width: '200px',
        height: '50px',
        textAlign: 'center',
        backgroundColor: 'white',
        border: '1px solid aqua',
        borderRadius: '4px',
        lineHeight: '50px',
      },
      selected: {
        border: '1px solid #007bff',
      },
      editNode: {
        width: '400px',
      },
      button: {
        width: '100px',
        height: '30px',
        lineHeight: '24px',
        boxSizing: 'border-box',
        textAlign: 'center',
        userSelect: 'none',
        marginRight: '10px',
        marginTop: '10px',
      },
  };
});
export default useStyles;