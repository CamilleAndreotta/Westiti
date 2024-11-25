export interface ButtonProps {
  to?: string; 
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void; 
  children: React.ReactNode; 
  className?: string; 
  type?:"submit" | "reset" | "button";
  disabled?:boolean
}
