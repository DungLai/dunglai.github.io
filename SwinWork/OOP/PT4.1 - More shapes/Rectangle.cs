using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwinGameSDK;

namespace MyGame
{
    public class Rectangle : Shape
    {
        private int _height, _width;

        public override bool IsAt(Point2D _point2D)
        {
            return SwinGame.PointInRect(_point2D, X, Y, Width, Height);
        }

        public int Width
        {
            get
            {
                return _width;
            }
            set
            {
                _width = value;
            }
        }

        public int Height
        {
            get
            {
                return _height;
            }
            set
            {
                _height = value;
            }
        }

        public Rectangle() : this(Color.Green, 0, 0, 100, 100) { }

        public Rectangle(Color clr, float x, float y, int width, int height) : base(clr)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }

        public override void Draw()
        {
            SwinGame.FillRectangle(Color, X, Y, Width, Height);

            if (Selected == true)
                DrawOutline();
        }

        public override void DrawOutline()
        {
            SwinGame.DrawRectangle(Color.Black,
                                   X - 2,
                                   Y - 2,
                                   Width + 4,
                                   Height + 4);
        }
    }
}
