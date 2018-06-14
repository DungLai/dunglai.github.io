using System;
using SwinGameSDK;

namespace MyGame
{
    public class GameMain
    {
        private enum ShapeKind
        {
            Rectangle,
            Circle,
            Line
        }

        public static void Main()
        {
            //Open the game window
            SwinGame.OpenGraphicsWindow("GameMain", 800, 600);
            //SwinGame.ShowSwinGameSplashScreen();

            //Create object (shape)
            Drawing myDrawing;
            myDrawing = new Drawing();

            //create enum shapekind
            ShapeKind kindToAdd = ShapeKind.Circle;

            // Game loop
            while (false == SwinGame.WindowCloseRequested())
            {
                //Fetch the next batch of UI interaction
                SwinGame.ProcessEvents();

                //Clear the screen
                SwinGame.ClearScreen(Color.White);

                //change kindToAdd to Rectangle when press R
                if (SwinGame.KeyTyped((KeyCode)114))
                {
                    kindToAdd = ShapeKind.Rectangle;
                }

                //change kindToAdd to Circle when press C
                if (SwinGame.KeyTyped((KeyCode)99))
                {
                    kindToAdd = ShapeKind.Circle;
                }  
                
                //change kindToAdd to Line when press L
                if (SwinGame.KeyTyped((KeyCode)108))
                {
                    kindToAdd = ShapeKind.Line;
                }

                //Change x,y position of myShape after left mouse clicked
                if (SwinGame.MouseClicked(MouseButton.LeftButton))
                {
                    Shape newShape;

                    if (kindToAdd == ShapeKind.Circle)
                    {
                        Circle newCircle = new Circle();
                        newShape = newCircle;
                    }
                    else if (kindToAdd == ShapeKind.Rectangle)
                    {
                        Rectangle newRect = new Rectangle();
                        newShape = newRect;
                    }
                    else
                    {
                        Line newLine = new Line();
                        newShape = newLine;
                    }

                    myDrawing.AddShape(newShape);
                }

                //Press space to change shape color
                if (SwinGame.KeyTyped((KeyCode)32)) /*32 is KeyCode Space*/
                {
                    myDrawing.Background = SwinGame.RandomRGBColor(255);
                }

                //Draw everything on the screen
                myDrawing.Draw();

                //select a shape to change its color
                if (SwinGame.MouseClicked(MouseButton.RightButton))
                {
                    myDrawing.SelectShapesAt(SwinGame.MousePosition());
                }

                //Draw Framerate
                SwinGame.DrawFramerate(0,0);

                if (SwinGame.KeyTyped((KeyCode)127))
                    myDrawing.DeleteSelectedShapes();

                //Draw onto the screen
                SwinGame.RefreshScreen(60);
            }
        }
    }
}