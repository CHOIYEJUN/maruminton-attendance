import BasicFlex from '@components/layout/BasicFlex';

const TopMenu = () => {
  return (
    <BasicFlex
      containerStyles={{
        width: '100%',
        height: '50px',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>TopMenu</div>
    </BasicFlex>
  );
};

export default TopMenu;
