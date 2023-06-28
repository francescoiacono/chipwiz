import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { useCallAction } from '@/components/hooks/actions';

const CallAction = () => {
  const { handleCall } = useCallAction();

  return <PrimaryButton onClick={handleCall}>Call</PrimaryButton>;
};

export default CallAction;
