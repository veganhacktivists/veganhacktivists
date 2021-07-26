import { DarkButton } from 'components/decoration/buttons';

const GrantsApplication: React.FC = () => {
  return (
    <div className="p-12 bg-gray-background">
      <div className="max-w-screen-lg mx-auto text-center mb-24">
        <h3 className="text-4xl font-mono font-semibold mb-10 mt-12">
          Application Form
        </h3>
        <p>Fields TBD</p>
        <DarkButton className="font-mono uppercase w-64 mt-24">
          Submit
        </DarkButton>
      </div>
    </div>
  );
};

export default GrantsApplication;
