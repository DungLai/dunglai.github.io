using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Clock
{
    class Program
    {
        public static void Main(string[] args)
        {
            //UnitTest TestObject = new UnitTest();

            //Console.WriteLine("Execute Test clock object: ");
            //TestObject.Test();

            //Console.WriteLine("End testing, start execute real timer: ");

            Clock Timer = new Clock();
            Console.WriteLine();

            Console.WriteLine("Press space to reset timer!");

            while (true)
            {
                //Console.ReadKey() is a blocking function, it stops the execution of the program and waits for a key press, but thanks to checking Console.KeyAvailable first, the while loop is not blocked, but running until the Esc is pressed.
                while (!(Console.KeyAvailable && Console.ReadKey(true).Key == ConsoleKey.Spacebar))
                {
                    Timer.Display();
                    Thread.Sleep(1000);
                    Timer.AdvanceOneSecond();
                }

                Timer.Reset();
            }
        }
    }
}
