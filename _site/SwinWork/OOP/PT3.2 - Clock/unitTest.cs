using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace Clock
{
    [TestFixture]

    public class UnitTest
    {
        Clock Clock = new Clock();

        [Test, Order(1)]
        public void TestInitClock()
        {
            //test initial clock
            Console.Write("Time after initializing clock object: ");

            Assert.AreEqual("00:00:00", Clock.Time);
            //Clock.Display();
        }           

        [Test, Order(2)]
        //Test increment
        public void TestIncrement1Second()
        {
            Console.Write("Time after advance one second: ");
            Clock.AdvanceOneSecond();
            Clock.Display();
            Assert.AreEqual("00:00:01", Clock.Time);
        }

        [Test, Order(3)]
        public void TestIncrement59Seconds()
        {
            Console.Write("Time after increment SecondCounter by 59: ");
            for (int i = 0; i < 59; i++)
            {
                Clock.SecondsCounter.Increment();
            }

            Clock.Display();

            Assert.AreEqual("00:01:00", Clock.Time);
        }

        [Test, Order(4)]
        public void TestIncrement59Minutes()
        {
            Console.Write("Time after increment MinuteCounter by 59: ");
            for (int i = 0; i < 59; i++)
            {
                Clock.MinutesCounter.Increment();
            }

            Clock.Display();

            Assert.AreEqual("01:00:00", Clock.Time);
        }

        [Test, Order(5)]
        public void TestIncrement23Hours()
        {
            Console.Write("Time after increment HourCounter by 23: ");
            for (int i = 0; i < 23; i++)
            {
                Clock.HoursCounter.Increment();
            }

            Clock.Display();

            Assert.AreEqual("00:00:00", Clock.Time);
        }

        [Test, Order(6)]
        public void TestReset()
        {
            //test reset 
            Console.Write("Time after reset the clock: ");
            Clock.Reset();

            Clock.Display();
            Assert.AreEqual("00:00:00", Clock.Time);
        }
    }
}
