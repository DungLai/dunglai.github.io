using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clock
{
    public class Clock
    {
        private string _time;

        public Counter SecondsCounter;
        public Counter MinutesCounter;
        public Counter HoursCounter;

        public string Time
        {
            get
            {
                return _time;
            }
        }

        public Clock()
        {
            _time = "00:00:00";
            SecondsCounter = new Counter("SecondsCounter");
            MinutesCounter = new Counter("MinutesCounter");
            HoursCounter = new Counter("HoursCounter");
        }

        public void Reset()
        {
            SecondsCounter.Reset();
            MinutesCounter.Reset();
            HoursCounter.Reset();
        }

        public void Display()
        {
            string sec = "";
            string min = "";
            string hour = "";

            //second string
            if (SecondsCounter.Value<10)
            {
                sec = "0" + SecondsCounter.Value.ToString();
            } 
            else if (SecondsCounter.Value <60)
            {
                sec = SecondsCounter.Value.ToString();
            }
            else
            {
                SecondsCounter.Reset();
                sec = "00";
                MinutesCounter.Increment();
            }
            
            //minute string
            if (MinutesCounter.Value < 10)
            {
                min = "0" + MinutesCounter.Value.ToString();
            }
            else if (MinutesCounter.Value < 60)
            {
                min = MinutesCounter.Value.ToString();
            }
            else
            {
                MinutesCounter.Reset();
                min = "00";
                HoursCounter.Increment();
                
            }

            //hour string
            if (HoursCounter.Value<10)
            {
                hour = "0" + HoursCounter.Value.ToString();
            }
            else if (HoursCounter.Value < 24)
            {
                hour = HoursCounter.Value.ToString();
            }
            else
            {
                HoursCounter.Reset();
                hour = "00";
                MinutesCounter.Reset();
                min = "00";
                SecondsCounter.Reset();
                sec = "00";
            }

            _time = hour + ":" + min + ":" + sec;

            Console.WriteLine(_time);
        }

        public void AdvanceOneSecond()
        {
            SecondsCounter.Increment();
        }
    }
}
