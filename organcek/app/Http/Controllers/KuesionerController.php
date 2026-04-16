<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;

class KuesionerController extends Controller
{
    // Define the BMI categories and mapping logic that was inside JS
    const BMI_CATEGORIES = [
        ['label' => 'Kurang', 'min' => 0, 'max' => 18.49, 'modifier' => -1, 'affects' => ['jantung', 'paru', 'hati']],
        ['label' => 'Normal', 'min' => 18.5, 'max' => 22.9, 'modifier' => 0, 'affects' => ['jantung', 'hati', 'paru', 'ginjal']],
        ['label' => 'Lebih', 'min' => 23, 'max' => 27.49, 'modifier' => -1, 'affects' => ['jantung', 'hati', 'paru', 'ginjal']],
        ['label' => 'Obesitas', 'min' => 27.5, 'max' => PHP_FLOAT_MAX, 'modifier' => -2, 'affects' => ['jantung', 'hati', 'paru', 'ginjal']],
    ];

    public function calculate(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'answers' => 'required|array'
        ]);

        $weight = $validated['weight'];
        $heightCm = $validated['height'];
        
        $heightM = $heightCm / 100;
        $bmi = $weight / ($heightM * $heightM);

        $bmiCategory = null;
        foreach (self::BMI_CATEGORIES as $cat) {
            if ($bmi >= $cat['min'] && $bmi <= $cat['max']) {
                $bmiCategory = $cat;
                break;
            }
        }
        if (!$bmiCategory) {
            $bmiCategory = self::BMI_CATEGORIES[1];
        }

        $scores = [];
        foreach ($validated['answers'] as $organ => $answers) {
            $totalQuestions = count(array_filter($answers, fn($v) => $v !== null));
            $maxPossible = $totalQuestions * 2;
            
            $score = 0;
            foreach ($answers as $val) {
                if ($val !== null) {
                    $score += (int)$val;
                }
            }
            
            $percentage = ($maxPossible > 0) ? ($score / $maxPossible) * 100 : 0;

            // Apply BMI modifier
            if (in_array($organ, $bmiCategory['affects'])) {
                $percentage += $bmiCategory['modifier'];
            }

            $percentage = max(0, min(100, $percentage));
            $scores[$organ] = round($percentage);
        }

        $result = Result::create([
            'berat_badan' => $weight,
            'tinggi_badan' => $heightCm,
            'bmi' => round($bmi, 1),
            'bmi_category' => $bmiCategory['label'],
            'organ_scores' => $scores
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $result->id,
                'scores' => $scores,
                'bmi_data' => [
                    'bmi' => round($bmi, 1),
                    'category' => $bmiCategory['label'],
                    'modifier' => $bmiCategory['modifier']
                ]
            ]
        ]);
    }
}
