using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwinGameSDK;

namespace MyGame
{
    public class Circle : Shape
    {
        //radius field
        private int _radius;

        public int Radius
        {
            get
            {
                return _radius;
            }

            set
            {
                _radius = value;
            }
        }

        public Circle() : this(Color.Blue, 50) { }

        public Circle(Color clr, int radius)
        {
            Color = clr;
            Radius = radius;
        }

        public override void Draw()
        {
            if (Selected)
                DrawOutline();

            SwinGame.FillCircle(Color, X, Y, _radius);
        }

        public override bool IsAt(Point2D _point2D)
        {
            return SwinGame.PointInCircle(_point2D, X, Y, _radius);
        }

        public override void DrawOutline()
        {
            if (Selected)
                SwinGame.DrawCircle(Color.Black, X, Y, _radius + 2);
        }
    }
}
