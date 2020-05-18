using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwinGameSDK;

namespace MyGame
{
    public class Line : Shape
    {
        private float _endX, _endY;

        public override bool IsAt(Point2D _point2D)
        {
            return SwinGame.PointOnLine(SwinGame.MousePosition(), X, Y, EndX, EndY);
        }

        public float EndX
        {
            get
            {
                return _endX;
            }
            set
            {
                _endX = value;
            }
        }

        public float EndY
        {
            get
            {
                return _endY;
            }
            set
            {
                _endY = value;
            }
        }

        public Line() : this(Color.Black, 0, 0, 50, 50) { }

        public Line(Color c, float startX, float startY, float EndX, float EndY)
        {
            X = startX;
            Y = startY;
            EndX = _endX;
            EndY = _endY;
        }

        public override void Draw()
        {
            EndX = X + 200;
            EndY = Y;
            SwinGame.DrawLine(Color.Black, X, Y, EndX, EndY);

            if (Selected == true)
                DrawOutline();
        }

        public override void DrawOutline()
        {
            SwinGame.DrawCircle(Color.Black, X, Y, 6);
            SwinGame.DrawCircle(Color.Black, EndX, EndY, 6);
        }
    }
}
