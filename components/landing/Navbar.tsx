import { Button } from "@/components/ui/button";

export default function Navbar() {

  return (

    <nav className="flex items-center justify-between px-8 py-5">

      <h1 className="text-2xl font-bold">
        SmartPark AI
      </h1>


      <div className="flex items-center gap-6">

        <a className="text-sm">
          Features
        </a>

        <a className="text-sm">
          Solution
        </a>

        <a className="text-sm">
          Contact
        </a>


        <Button>
          Get Started
        </Button>


      </div>


    </nav>

  )

}