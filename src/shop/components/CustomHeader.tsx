import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link, useParams, useSearchParams } from "react-router";
export const CustomHeader = () => { 
  const [cartCount] = useState(3);

  const [searchParams, setSearchParams] = useSearchParams();
  const { gender } = useParams();
  const queryInput = searchParams.get('query') || '';
  console.log(gender);
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleSeachInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key != 'Enter') return;
    
    const query = inputRef.current?.value;
    const newSearchParams = new URLSearchParams();
    if(!query) {
      newSearchParams.delete('query');
    }else{

      newSearchParams.set('query', inputRef.current!.value);
    }

    setSearchParams(newSearchParams);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold tracking-tight">TESLA STYLE</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Todos
            </Link>
            <Link
              to="/gender/men"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Hombres
            </Link>
            <Link
              to="/gender/women"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Mujeres
            </Link>
            <Link
              to="/gender/kid"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Niños
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  onKeyDown={handleSeachInput}
                  defaultValue={queryInput}
                />
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
