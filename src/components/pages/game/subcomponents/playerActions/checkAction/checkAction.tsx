import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { useCheckAction } from '@/components/hooks/actions';

const CheckAction = () => {
  const { handleCheck } = useCheckAction();

  return <PrimaryButton onClick={handleCheck}>Check</PrimaryButton>;
};

export default CheckAction;
