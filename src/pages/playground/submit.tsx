export function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://flockwork.org/request-help?source=playground',
      permanent: true,
    },
  };
}

const SubmitRequestPage = () => {
  return <></>;
};

export default SubmitRequestPage;
