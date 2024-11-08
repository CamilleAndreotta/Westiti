export interface ButtonProps {
  to?: string; 
  onClick?: () => void; 
  children: React.ReactNode; 
  className?: string; 
  type?:string| undefined;
  disabled?:string
}
