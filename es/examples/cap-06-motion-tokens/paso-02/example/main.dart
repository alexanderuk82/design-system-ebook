// Ejemplo de uso de MotionTokens en una app Flutter.
// Para correr esto necesitas Flutter SDK instalado y un proyecto creado
// con `flutter create`. Copia lib/motion_tokens.dart a tu proyecto y
// usa los tokens como muestra esta pantalla.

import 'package:flutter/material.dart';
import '../lib/motion_tokens.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Motion tokens demo',
      home: DemoScreen(),
    );
  }
}

class DemoScreen extends StatefulWidget {
  const DemoScreen({super.key});

  @override
  State<DemoScreen> createState() => _DemoScreenState();
}

class _DemoScreenState extends State<DemoScreen> {
  bool expanded = false;
  bool visible = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Motion tokens')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('AnimatedContainer con MotionTokens.durationNormal + easeOut'),
            const SizedBox(height: 12),
            // Misma pieza que el snippet del libro.
            AnimatedContainer(
              duration: MotionTokens.durationNormal,
              curve: MotionTokens.easeOut,
              width: expanded ? 240 : 120,
              height: expanded ? 120 : 80,
              decoration: BoxDecoration(
                color: Colors.indigo,
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => setState(() => expanded = !expanded),
              child: Text(expanded ? 'Encoger' : 'Expandir'),
            ),
            const SizedBox(height: 32),

            const Text('AnimatedOpacity con MotionTokens.durationSlow + easeEmphasized'),
            const SizedBox(height: 12),
            AnimatedOpacity(
              opacity: visible ? 1 : 0,
              duration: MotionTokens.durationSlow,
              curve: MotionTokens.easeEmphasized,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.green.shade100,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: const Text('Confirmacion de exito'),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => setState(() => visible = !visible),
              child: Text(visible ? 'Ocultar' : 'Mostrar'),
            ),
          ],
        ),
      ),
    );
  }
}
