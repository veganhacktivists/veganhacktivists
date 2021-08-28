import { useForm } from 'react-hook-form';
import { DarkButton } from '../../decoration/buttons';
import Label from '../../forms/inputs/label';
import TextInput from '../../forms/inputs/textInput';

interface GrantsForm {
  // Section A - About you
  over18: boolean;
  gender?: string;
  location: string;
  info: string;

  // Section B - Your Project
  projectName: string;
  projectInfo: string;
  projectLocation: string;
  projectSteps: string;
  targetAudience: string;

  // Section C - Success
  howSuccessful: string;
  otherOrgs: string;

  // Section D - Budget
  totalNumber: number;
  appliedBudget: number;
  fundsUsage: string;
  canAcceptFunding: boolean;
}

const GrantsApplication: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useForm<GrantsForm>();

  return (
    <div className="p-12 bg-gray-background">
      <div className="max-w-screen-lg mx-auto text-center mb-24">
        <h3 className="text-4xl font-mono font-semibold mb-10 mt-12">
          Application Form
        </h3>
        <h4 className="text-xl">Section A - About You</h4>
        <div>
          <Label name="over18">Are you over 18?</Label>
          <input type="checkbox" name="over18" id="over18" />
        </div>

        <TextInput name="gender" error={!!errors.gender} />

        <DarkButton className="font-mono uppercase w-64 mt-24">
          Submit
        </DarkButton>
      </div>
    </div>
  );
};

export default GrantsApplication;
