import PrimaryButton from '@/components/ui/primaryButton/primaryButton';
import { useFoldAction } from '@/components/hooks/actions';

const FoldAction = () => {
  const { handleFold } = useFoldAction();

  return <PrimaryButton onClick={handleFold}>Fold</PrimaryButton>;
};

export default FoldAction;
