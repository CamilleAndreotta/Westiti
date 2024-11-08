export interface ButtonProps {
  to?: string; 
  onClick?: () => void; 
  children: React.ReactNode; 
  className?: string; 
  type?:"submit" | "reset" | "button";
  disabled?:string
}
