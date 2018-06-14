using System.Collections.Generic;
using SwinGameSDK;


namespace MyGame
{
    public class Drawing
    {
        private readonly List<Shape> _shapes;

        private Color _background;

        //return the number of object in list
        public int ShapeCount
        {
            get
            {
                return _shapes.Count;
            }
        }

        public Color Background
        {
            get
            {
                return _background;
            }
            set
            {
                _background = value;
            }
        }

        //select shapes to delete, create a copy so that we can loop through the list then delete object in _shapes
        public List<Shape> SelectedShapes
        {
            get
            {
                List<Shape> result;
                result = new List<Shape>();

                foreach (Shape s in _shapes)
                {
                    if (s.Selected == true)
                    {
                        result.Add(s);
                    }
                }

                return result;
            }
        }

        public Drawing(Color background)
        {
            _shapes = new List<Shape>();
            _background = Color.White;
        }


        // this default constructor call the constructor with paramter Color.White
        public Drawing() : this(Color.White)
        {
            //This refer to the object in the current constructor
        }

        public void AddShape(Shape s)
        {
            s.X = SwinGame.MouseX();
            s.Y = SwinGame.MouseY();

            _shapes.Add(s);
        }

        public void Draw()
        {
            SwinGame.ClearScreen(_background);

            //Loop every objects in list to draw itself
            foreach (var Shapes in _shapes)
            {
                Shapes.Draw();
            }
        }

        public void SelectShapesAt(Point2D pt)
        {
            foreach (Shape s in _shapes)
            {
                if (s.IsAt(pt) == true)
                {
                    s.Selected = true;
                }
            }
        }

        //delete selected shapes
        public void DeleteSelectedShapes()
        {
            // Have to loop in SelectedShapes because the list can not be altered during the loop
            foreach (Shape s in SelectedShapes)
            {
                if (s.Selected == true)
                {
                    _shapes.Remove(s);
                }
            }
        }
    }
}

     