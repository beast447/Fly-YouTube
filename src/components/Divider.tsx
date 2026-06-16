import { FY } from '../theme.ts';

export default function Divider() {
  return <div role="separator" style={{ height: 1, background: FY.border, margin: '4px 0' }} />;
}
